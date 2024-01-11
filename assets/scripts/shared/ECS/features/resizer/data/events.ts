import { Event } from 'shared/ECS/core';
import { ResizeEventData } from './types';

export const ResizeEvent = new Event<ResizeEventData>();
