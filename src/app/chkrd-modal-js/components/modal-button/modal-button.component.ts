import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalHandlerService } from 'src/app/shared/services/modal-handler.service';

@Component({
  selector: 'app-modal-button',
  templateUrl: './modal-button.component.html',
  styleUrls: ['./modal-button.component.scss']
})
export class ModalButtonComponent implements OnInit {
  @Input() modalId: string = ''
  @Input() modalTitle: string = ''
  @Input() modalBody: string = ''
  @Input() modalButtonText: string = ''
  constructor(private modalHandlerServices: ModalHandlerService) { }

  @ViewChild('modal', {read: ViewContainerRef})
  entry!: ViewContainerRef
  sub!: Subscription

  ngOnInit(): void {
  }

  createModal(){
    this.sub = this.modalHandlerServices
    .openModal(this.entry, this.modalTitle, this.modalBody)
    .subscribe((v: any) => console.log(v))    
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe()
    
  }
}
