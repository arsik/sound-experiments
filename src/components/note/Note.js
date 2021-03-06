import InteractiveComponent from 'lib/components/InteractiveComponent';
import Mediator from 'lib/Mediator';
import AudioManager from 'lib/AudioManager';
import { on, off } from 'dom-event';
import bindAll from 'lodash.bindAll';

export default class Note extends InteractiveComponent {
  constructor($el) {
    super($el);

    bindAll(this, 'onClick');

    this.$point = this.$el.querySelector('.Note-point');
    this.id = ~~this.$el.getAttribute('data-ref').replace('note-', '');

    switch(this.id) {
    case 7:
      this.line = 5;
      break;
    case 10:
    case 13:
      this.line = 4;
      break;
    case 4:
    case 5:
    case 8:
    case 11:
    case 15:
    case 17:
      this.line = 3;
      break;
    case 2:
    case 3:
    case 12:
    case 16:
    case 19:
      this.line = 2;
      break;
    case 1:
    case 6:
    case 9:
    case 14:
    case 18:
      this.line = 1;
      break;
    }
    on(this.$el, 'click', this.onClick);
  }

  destroy() {
    off(this.$el, 'click', this.onClick);
    super.destroy();
  }

  onClick() {
    Mediator.emit('note:click', this.$point.getBoundingClientRect().left, this.$point.getBoundingClientRect().top);
  }

  onMouseOver() {
    Mediator.emit('note:over', this.id);
    AudioManager.getSound(`note_${this.line}`).currentTime = 0;
    AudioManager.getSound(`note_${this.line}`).play();
  }

  onMouseOut() {
    Mediator.emit('note:out', this.id);
  }
}
