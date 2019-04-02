import { Injectable } from '@angular/core';

interface Scripts {
  name: string,
  src: string
}

export const Scriptsrc: Scripts[] = [
  { name: 'googlemaps', src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCaQsiZMQNrflWt7RIVF6CV_QTru_DNSeo&libraries=places' }
]
declare var document: any;

@Injectable()
export class MapService {

  private Scripts: any = {};

  constructor() {

    Scriptsrc.forEach((script: any) => {
      this.Scripts[script.name] = {
        loaded: false,
        src: script.src
      };
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
        script.type = 'text/javascript';
        script.src = this.Scripts[name].src;

        if (script.readyState) {
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {

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