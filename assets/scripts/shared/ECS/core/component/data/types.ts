import { Component } from 'cc';
import { ECSComponent } from '../component';
import { ObservableComponentWrapper } from '../observable-component';

export type ComponentFilter = {
  includes?: ComponentType<any>[];
  excludes?: ComponentType<any>[];
  withDisabled?: boolean;
};

export type UnionComponent = ECSComponent | Component;

export type ComponentType<T extends UnionComponent> = new (...args: any[]) => T;

export type ObservableComponent<T extends ECSComponent> =
  ObservableComponentWrapper<T> & T;
