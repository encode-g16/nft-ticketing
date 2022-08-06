import { NextFunction, Request, Response } from 'express';
import EventService from '@services/events.service';
import { HttpException } from '@/exceptions/HttpException';
import fsp from 'fs/promises';

class EventsController {
  public eventsService = new EventService();

  public getEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ownerFilter = req.query['owner'] as string;
      const events = await this.eventsService.getAllEvents(ownerFilter);
      res.status(200).json({ events });
    } catch (error) {
      next(error);
    }
  };

  public getEventsByAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const address = req.params.address;
      const event = await this.eventsService.getByEventAddress(address);
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  };

  public uploadEventImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contractAddress = req.params.address;

      if (req.file.buffer.slice(0, 2).compare(Buffer.from('ffd8', 'hex')) !== 0) {
        throw new HttpException(400, 'image needs to be jpeg');
      }
      await fsp.writeFile(`public/images/${contractAddress}.jpeg`, req.file.buffer);
      res.status(200).json({ message: 'uploaded' });
    } catch (error) {
      next(error);
    }
  };
}

export default EventsController;
