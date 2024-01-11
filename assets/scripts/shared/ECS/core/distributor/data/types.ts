import { ComponentFilter } from '../../component';
import { Event } from '../../event';
import { EntityObserver } from '../../observable';
import { Lifecycle, ECSSystem } from '../../system';

export type Decorable = {
  filterDecorator: ComponentFilter;
};

export type RegisteredSystem = {
  system: ECSSystem;
  hooks: Lifecycle[];
};

export type ReactiveSystem = {
  observer: EntityObserver;
  system: ECSSystem;
};

export type EventSystem = {
  event: Event<any>;
  system: ECSSystem;
};

export type DecorableReactiveSystem = ReactiveSystem & Decorable;

export type DecorableEventSystem = EventSystem & Decorable;
