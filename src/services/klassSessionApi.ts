import api from '@/services/api';
import type {
  CreateKlassSessionRequest,
  CreateKlassSessionResponse,
  UpdateKlassSessionRequest,
  deleteKlassSessionRequest,
} from '@/types';

async function createKlassSession(requestData: CreateKlassSessionRequest) {
  return await api
    .post<CreateKlassSessionResponse>(
      '/week_schedule/:token/klass_session',
      requestData,
    )
    .then((response) => response.data);
}

async function updateKlassSession(requestData: UpdateKlassSessionRequest) {
  return await api
    .patch('/week_schedule/:token/klass_session', requestData)
    .then((response) => response.data);
}

async function deleteKlassSession(requestData: deleteKlassSessionRequest) {
  return await api
    .delete('/week_schedule/:token/klass_session', {
      data: requestData,
    })
    .then((response) => response.data);
}

export { createKlassSession, updateKlassSession, deleteKlassSession };
