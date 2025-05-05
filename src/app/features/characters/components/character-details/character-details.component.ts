import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Character, Episode, Resident} from '../../models/character.model';
import {Store} from '@ngrx/store';
import {loadCharacterDetails} from '../../store/character.actions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-character-details',
  standalone: false,
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent implements OnChanges, OnInit {
  @Input() character?: Character | null;
  @Input() portrait = true;


  constructor(
    private readonly _store: Store,
    private readonly _activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (!!params['id']) {
        this.portrait = false
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['character'] && changes['character'].currentValue) {
      if (!!this.character)
        this._store.dispatch(loadCharacterDetails({payload: this.character}));
    }
  }

  getResident(): Resident | null {
    // @ts-ignore
    return this.character?.location?.residents?.length > 0 ? this.character.location.residents[0] : null;
  }

  getEpisode(): Episode | null {
    // @ts-ignore
    return this.character?.episode?.length > 0 ? this.character.episode[0] : null;
  }
}
