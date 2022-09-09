import { 
  AfterViewInit, 
  Component, 
  ElementRef, 
  EventEmitter, 
  Input, 
  OnDestroy, 
  OnInit, 
  Output, 
  ViewChild 
} from '@angular/core';

@Component({
  selector: 'app-modal-comp',
  templateUrl: './modal-comp.component.html',
  styleUrls: ['./modal-comp.component.scss']
})
export class ModalCompComponent implements OnInit {
  @Input() title: string = ''
  @Input() body: string = ''
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  @Input() modalActive: boolean = false
  @Input() modalOpening: boolean = false
  @Input() modalClosing: boolean = false

  constructor() { }

  @ViewChild('modalContainer') modalContainer!: ElementRef
  @ViewChild('close') 
  closeButtonElement !: ElementRef<HTMLElement>

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    // setTimeout(() => {
    //   this.closeButtonElement.nativeElement.focus()  
    // }, 0);
    this.closeButtonElement.nativeElement.focus()
    // this.closeButtonElement.nativeElement.classList.add('hello')

    // let closeButton: HTMLElement = <HTMLElement>document.getElementById('closeButton')
    // closeButton?.focus()
  }  

  closeMe() {
    this.closeMeEvent.emit('');
  }
  confirm() {
    this.confirmEvent.emit('');
  }
  ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }

}
