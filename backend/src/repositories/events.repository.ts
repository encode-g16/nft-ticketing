import { Event } from '@interfaces/events.interface';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

export class EventsRepo {
  private db = new JsonDB(new Config('events-db', true, true, '/'));

  async insertEvent(event: Event): Promise<void> {
    await this.db.push(`/events/${event.contractAddress}`, event);
  }

  async findEventByContractAddress(address: string): Promise<Event> {
    const event = await this.db.getObject<Event>(`/events/${address}`);
    return event;
  }

  async listAllEvents(): Promise<Event[]> {
    const event = await this.db.getObject<{ [key: string]: Event }>(`/events`);
    return Object.values(event);
  }
}

export default new EventsRepo();
