import { Injectable } from '@angular/core';
import { AppConstant } from '../app.constants';

interface Scripts {
    name: string;
    src: string;
}

export const Scriptsrc: Scripts[] = [
    { name: 'razarpay', src: AppConstant.RAZARPAYSCRIPT }
];
declare var document: any;

@Injectable()
export class RazarpayService {

    private Scripts: any = {};

    constructor() {
        Scriptsrc.forEach((script: any) => {
            this.Scripts[script.name] = {
                loaded: false,
                src: script.src
            };
        });
    }
    loadrazarpay() {
        return new Promise((resolve, reject) => {
            this.load('razarpay').then(res => {
                resolve(true);
            }).catch(error => {
                reject(false);
            });
        });
    }
    load(...Scripts: string[]) {
        const promises: any[] = [];
        Scripts.forEach((script) => promises.push(this.loadScript(script)));
        return Promise.all(promises);
    }

    loadScript(name: string) {
        return new Promise((resolve, reject) => {
            if (!this.Scripts[name].loaded) {
                let script = document.createElement('script');
                script.src = this.Scripts[name].src;
                if (script.readyState) {
                    script.onreadystatechange = () => {
                        if (script.readyState === 'loaded' || script.readyState === 'complete') {
                            script.onreadystatechange = null;
                            this.Scripts[name].loaded = true;
                            resolve({ script: name, loaded: true, status: 'Loaded' });
                        }
                    };
                } else {
                    script.onload = () => {
                        this.Scripts[name].loaded = true;
                        resolve({ script: name, loaded: true, status: 'Loaded' });
                    };
                }
                script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
                document.getElementsByTagName('head')[0].appendChild(script);
            } else {
                resolve({ script: name, loaded: true, status: 'Already Loaded' });
            }
        });
    }
}
