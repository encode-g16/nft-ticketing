import { HttpException } from '@exceptions/HttpException';
import { Event } from '@interfaces/events.interface';
import eventsRepo from '@/repositories/events.repository';

class EventService {
  public events = eventsRepo;

  /**
   * Returns all the available events.
   * An optional filter can be provided to return all the events belonging to a single event organizer.
   */
  public async getAllEvents(ownerAddressFilter?: string): Promise<Event[]> {
    if (ownerAddressFilter) {
      return this.events.filter(event => event.ownerAddress === ownerAddressFilter);
    }
    return this.events;
  }

  /**
   * Returns a single event that matches the provided event contract address.
   */
  public async getByEventAddress(address: string): Promise<Event> {
    const event = this.events.find(event => event.contractAddress === address);
    if (!event) throw new HttpException(404, 'event not found');
    return event;
  }
}

export default EventService;
