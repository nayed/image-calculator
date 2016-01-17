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

        <div class="media" *ngFor="#image of images">
            <div class="media-left">
                <a href="#">
                    <img class="media-object" src="{{ image.path }}" style="max-width: 200px">
                </a>
            </div>
            <div class="media-body">
                <h4 class="media-heading">{{ image.name }}</h4>
                <p>{{ image.size }} bytes</p>
            </div>
        </div>
    `
})

export class App {
    images:Array<Object> = []

    constructor() {}

    handleDrop(e) {
        var files:File = e.dataTransfer.files
        var self = this
        Object.keys(files).forEach(key => {
            if (files[key].type === "image/png" || files[key] === "image/jpeg") {
                self.images.push(files[key])
            }
            else {
                alert("File must be a PNG or JPEG")
            }
        })

        return false
    }
}

bootstrap(App)