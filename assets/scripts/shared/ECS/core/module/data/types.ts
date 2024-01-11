import { SystemConstructor } from '../../system';
import { ECSModule } from '..';
import { ComponentType } from '../../component';

export type SystemProvider = {
  provide: SystemConstructor;
  includes?: ComponentType<any>[];
  excludes?: ComponentType<any>[];
  withDisabled?: boolean;
};

export type ModuleWithRegistered = ECSModule & { providers: SystemProvider[] };
