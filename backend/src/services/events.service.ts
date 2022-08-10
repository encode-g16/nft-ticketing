import * as ethers from 'ethers';
import { HttpException } from '@exceptions/HttpException';
import { Event } from '@interfaces/events.interface';
import eventsRepo from '@repositories/events.repository';
import * as EventContractFactoryABI from '@contracts/EventContractFactory.json';
import * as EventABI from '@contracts/Event.json';

class EventService {
  private eventsRepo = eventsRepo;
  private eventsIface = new ethers.utils.Interface(EventContractFactoryABI.abi);
  private eventFactoryContract = new ethers.Contract(process.env.EVENT_FACTORY_ADDRESS, EventContractFactoryABI.abi);
  private provider = new ethers.providers.JsonRpcProvider(process.env.ROPSTEN_URL);
  private wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  private signer = this.wallet.connect(this.provider);

  constructor() {
    const eventCreationFilter = this.eventFactoryContract.filters.EventCreation();
    this.provider.on(eventCreationFilter, async ({ topics, data }) => {
      try {
        const parsedLog = this.eventsIface.parseLog({ topics, data });
        const newEventContractAddress = parsedLog.args['contractAddress'];
        console.log(`new contract created with contract address : ${newEventContractAddress}`);
        const eventContract = new ethers.Contract(newEventContractAddress, EventABI.abi, this.signer);
        await eventContract.deployed();
        const name = await eventContract['name']();
        const ownerAddress = await eventContract['owner']();
        const date = (await eventContract['dateOfEvent']()) as ethers.BigNumber;
        const price = (await eventContract['ticketPrice']()) as ethers.BigNumber;
        const location = await eventContract['location']();
        const event: Event = {
          contractAddress: newEventContractAddress,
          ownerAddress,
          name,
          date: date.toNumber(),
          price: price.toString(),
          location,
          imageUrl: `/images/${newEventContractAddress}.jpeg`,
        };
        console.log(`new event contract deployed: ${JSON.stringify(event)}`);
        await this.eventsRepo.insertEvent(event);
      } catch (err) {
        console.log(err);
      }
    });
  }

  /**
   * Returns all the available events.
   * An optional filter can be provided to return all the events belonging to a single event organizer.
   */
  public async getAllEvents(ownerAddressFilter?: string): Promise<Event[]> {
    const events = await this.eventsRepo.listAllEvents();
    if (ownerAddressFilter) {
      return events.filter(event => event.ownerAddress === ownerAddressFilter);
    }
    return events;
  }

  /**
   * Returns a single event that matches the provided event contract address.
   */
  public async getByEventAddress(address: string): Promise<Event> {
    try {
      const event = await this.eventsRepo.findEventByContractAddress(address);
      return event;
    } catch (err) {
      if (err.id && err.id === 5) {
        throw new HttpException(404, 'event not found');
      }
      throw err;
    }
  }
}

export default EventService;
