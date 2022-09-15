import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalCompComponent } from 'src/app/chkrd-modal-js/components/modal-comp/modal-comp.component';



@Injectable({
  providedIn: 'root'
})
export class ModalHandlerService {
  private componentRef!: ComponentRef<ModalCompComponent>
  private componentSubscriber!: Subject<string>
  constructor() { }

  openModal(entry: ViewContainerRef, modalTitle: string, modalBody: string){
    this.componentRef = entry.createComponent(ModalCompComponent)
    this.componentRef.instance.title = modalTitle
    this.componentRef.instance.body = modalBody
    this.componentRef.instance.modalOpening = true
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
    this.componentSubscriber = new Subject<string>();
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '17px'
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentRef.instance.modalClosing = true
    const t = setTimeout(() => {
      clearTimeout(t)
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('padding-right')
      this.componentSubscriber.complete();
      this.componentRef.destroy();
    }, 250)
  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }
}
