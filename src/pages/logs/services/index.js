import api from '@/util/api';
export function fetData(){
      return api.get('api/index')
}