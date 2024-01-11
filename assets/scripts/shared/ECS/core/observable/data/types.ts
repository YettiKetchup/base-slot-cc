import { Entity } from '../../entity';

export type ObserverSubscribeCallback = (entity: Entity) => void;

export type ObserverConditionPipe = (entity: Entity) => boolean;
