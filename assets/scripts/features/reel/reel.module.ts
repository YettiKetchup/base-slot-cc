import { _decorator } from 'cc';
import { ECSModule, RegisterSystems } from 'shared/ECS';

const { ccclass, menu } = _decorator;

@RegisterSystems([])
@ccclass('ReelModule')
@menu('Modules/ReelModule/ReelModule')
export class ReelModule extends ECSModule {}
