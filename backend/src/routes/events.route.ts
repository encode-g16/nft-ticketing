import { Router } from 'express';
import EventController from '@controllers/events.controller';
import { Routes } from '@interfaces/routes.interface';
import multer from 'multer';
const upload = multer();

class EventsRoute implements Routes {
  public path = '/events';
  public router = Router();
  public eventController = new EventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.eventController.getEvents);
    this.router.get(`${this.path}/:address`, this.eventController.getEventsByAddress);
    this.router.post(`${this.path}/:address/image`, upload.single('image'), this.eventController.uploadEventImage);
  }
}

export default EventsRoute;
