import IRouteConfig from './../interfaces/IRouteConfig';

export default abstract class Controller {

    public abstract paths?: IRouteConfig[];
    public getRoutConfig(): IRouteConfig[] {
        return this.paths;
    }

}