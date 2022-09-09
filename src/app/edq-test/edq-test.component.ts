import { Component, OnInit, Renderer2 } from '@angular/core';

declare function configureAndInitializeEDQ(): any

@Component({
  selector: 'app-edq-test',
  templateUrl: './edq-test.component.html',
  styleUrls: ['./edq-test.component.scss']
})
export class EdqTestComponent implements OnInit {
  
  constructor(private _window: Window, private renderer: Renderer2) { }
  
  ngOnInit(): void {
    console.log(this._window);
    this.loadScript("assets/js/myAccountEdqScript.js");
  }

  public loadScript(url: any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
}

}
