import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IChat } from '../chat.model';

@Component({
  standalone: true,
  selector: 'jhi-chat-detail',
  templateUrl: './chat-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ChatDetailComponent {
  chat = input<IChat | null>(null);

  previousState(): void {
    window.history.back();
  }
}
