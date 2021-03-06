class AutoSaver {
    public _saverHandler!: (() => void) | undefined;
    public saverTimer!: NodeJS.Timer;

    public Saver: ProxyHandler<any> = {};
    public Save() {
        clearTimeout(this.saverTimer);
        // let object sync back
        this.saverTimer = setTimeout(() => {
            if (this._saverHandler !== undefined) {
                try {
                    this._saverHandler();
                } catch (e) {
                    console.error(e);
                }
            }
        },                           100);
    }
    public constructor() {
        const Save = () => this.Save();
        this.Saver = {
            get(target: any, propName: PropertyKey) {
                const val = target[propName];
                // console.info("get", target, propName, val);
                return val;
            },
            set(target: any, propName: PropertyKey, value: any) {
                target[propName] = value;
                // console.info("set", target, propName, value);
                Save();
                return true;
            },
        };
    }
}

export { AutoSaver };
