import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventifyEvent } from '@eventify-org/common-api';

@Component({
  selector: 'eventify-org-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    NgFor,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  @HostBinding('class.c-eventify-org-toolbar') class = true;

  @Input() cart?: EventifyEvent[] | null;

  @Output() formValueChanges = new EventEmitter();

  @Output() removeFromCart = new EventEmitter();

  toolbarForm = new FormGroup({
    search: new FormControl(''),
  });

  ngOnInit(): void {
    this.toolbarForm.get('search')?.valueChanges.subscribe((value) => {
      this.formValueChanges.emit(value);
    });
  }

  onRemoveFromCart(item: EventifyEvent) {
    this.cart = this.cart?.filter((cartItem) => cartItem._id !== item._id);
    this.removeFromCart.emit(item);
  }
}
