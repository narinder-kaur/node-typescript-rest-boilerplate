export default interface IRouteConfig {
    method: string;
    path: string;
    middlewares: object[];
    handler: any;
}