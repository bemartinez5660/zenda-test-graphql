import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {map, take} from 'rxjs';
import {CharacterParams} from '../models/character-filter';

const QUERY = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
          type
        }
        location {
          id
          name
          type
          residents {
            id
            name
            gender
          }
        }
        image
        episode {
          id
          name
          air_date
        }
        created
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CharacterGraphqlService {

  constructor(
    private readonly _apollo: Apollo
  ) {
  }

  getAllCharacters(getParams?: CharacterParams){
    const filter: { [key: string]: string } = {};
    getParams?.filters?.forEach((filterItem) => {
      if (filterItem?.filterName && filterItem?.filterValue) {
        filter[filterItem.filterName] = filterItem.filterValue;
      }
    });

    const variables: { page?: number; filter?: any } = {};
    if (getParams?.page) {
      variables.page = getParams.page;
    }
    if (Object.keys(filter).length > 0) {
      variables.filter = filter;
    }

    return this._apollo.watchQuery<any>({
      query: QUERY,
      variables,
    }).valueChanges
      .pipe(
        take(1),
        map(({data}) => {
          return data.characters;
        })
      );
  }
}
