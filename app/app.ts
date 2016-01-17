import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core'
import {NgFor} from 'angular2/common'

@Component({
    selector: 'app',
    template: `
        <div
          (dragover)="false"
          (dragend)="false"
          (drop)="handleDrop($event)"
          style="height: 300px; border: 5px dotted #ccc">
            <p style="margin: 10px; text-align: center">
                <strong>Drop your images here</strong>
            </p>
        </div>
    `
})

export class App {
    constructor() {}

    handleDrop(e) {
        var files:File = e.dataTransfer.files
        Object.keys(files).forEach(key => {
            console.log(files[key])
        })

        return false
    }
}

bootstrap(App)