import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core'
import {NgFor} from 'angular2/common'

@Component({
    selector: 'app',
    template: `
        <h1>Total images: {{ imageStats().count }}</h1>
        <h1>Total size: {{ imageStats().size }} bytes</h1>
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

    imageStats() {
        let sizes:Array<Number> = []
        let totalSize:number = 0

        this
          .images
          .forEach((image:File) => sizes.push(image.size))

        sizes
          .forEach((size:number) => totalSize += size)

        return { size: totalSize, count: this.images.length }
    }
}

bootstrap(App)