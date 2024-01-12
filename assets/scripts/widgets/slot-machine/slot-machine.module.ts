import { _decorator } from 'cc';
import { ECSModule, RegisterSystems } from 'shared/ECS';

const { ccclass, property, menu } = _decorator;

@RegisterSystems([])
@ccclass('SlotMachineModule')
@menu('Modules/SlotMachineModule/SlotMachineModule')
export class SlotMachineModule extends ECSModule {}
