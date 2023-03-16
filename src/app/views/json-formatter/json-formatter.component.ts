import { Component, OnInit, ViewChild } from '@angular/core';
import {
  JsonEditorComponent,
  JsonEditorOptions,
} from 'ang-jsoneditor';
import { PrettyjsonPipe } from '../pipes/prettyjson.pipe';

@Component({
  selector: 'app-json-formatter',
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.scss'],
  providers: [PrettyjsonPipe]
})
export class JsonFormatterComponent implements OnInit {
  public editorOptions: JsonEditorOptions;
  public data = undefined;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;
  
  constructor(
    // private jsonPipe: JsonPipe,
    private prettyjsonPipe: PrettyjsonPipe,
  ) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    setTimeout(() => {
      this.editor.setMode('code');  
    }, 0);
    
    //this.options.mode = 'code'; //set only one mode

    // this.data = {
    //   products: [
    //     {
    //       name: 'car',
    //       product: [
    //         {
    //           name: 'honda',
    //           model: [
    //             { id: 'civic', name: 'civic' },
    //             { id: 'accord', name: 'accord' },
    //             { id: 'crv', name: 'crv' },
    //             { id: 'pilot', name: 'pilot' },
    //             { id: 'odyssey', name: 'odyssey' },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // };
  }

  ngOnInit(): void {}

  getData(event) {
    console.log(event);
    this.data = event;
  }

  format() {
    const x = JSON.stringify(this.data);
    console.log(x);
    this.data = this.prettyjsonPipe.transform(this.data);
  }

  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (JSON.stringify(item)));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
}
