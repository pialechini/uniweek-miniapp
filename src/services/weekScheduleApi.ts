import { toast } from '@/components/Toast';
import api from '@/services/api';
import supabase from '@/services/supabase';
import {
  createKlassSessionRequestBodySchema,
  deleteKlassSessionRequestBodySchema,
  updateKlassSessionRequestBodySchema,
} from '@/services/validationSchemas';
import { CreateKlassSessionResponse, WeekSchedule } from '@/types';
import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/*                                Error Handler                               */
/* -------------------------------------------------------------------------- */
function handlError(error: Error, titleOnError: string) {
  if (error instanceof z.ZodError) {
    error.errors.forEach((err) => toast.error(titleOnError, err.message));
  } else {
    toast.error('خطای ناشناخته', 'مشکلی پیش آمده است');
  }

  throw error;
}

/* -------------------------------------------------------------------------- */
/*                                API Functions                               */
/* -------------------------------------------------------------------------- */
async function fetchWeekSchedule(token: string) {
  const { data, error } = await supabase
    .from('week_schedules')
    .select('week_schedule')
    .eq('token', token)
    .single();

  if (error) {
    console.error('Error fetching week schedule:', error);
  }

  return data?.week_schedule as WeekSchedule | undefined;
}

function createKlassSession(
  requestData: z.infer<typeof createKlassSessionRequestBodySchema>,
) {
  return createKlassSessionRequestBodySchema
    .parseAsync(requestData)
    .then(() =>
      api.post<CreateKlassSessionResponse>(
        '/week_schedule/:token/klass_session',
        requestData,
      ),
    )
    .then((response) => response.data)
    .catch((err) => handlError(err, 'خطا در ایجاد جلسه'));
}

function updateKlassSession(
  requestData: z.infer<typeof updateKlassSessionRequestBodySchema>,
) {
  return updateKlassSessionRequestBodySchema
    .parseAsync(requestData)
    .then(() => api.patch('/week_schedule/:token/klass_session', requestData))
    .then((response) => response.data)
    .catch((err) => handlError(err, 'خطا در بروزرسانی جلسه'));
}

function deleteKlassSession(
  requestData: z.infer<typeof deleteKlassSessionRequestBodySchema>,
) {
  return deleteKlassSessionRequestBodySchema
    .parseAsync(requestData)
    .then(() =>
      api.delete('/week_schedule/:token/klass_session', {
        data: requestData,
      }),
    )
    .then((response) => response.data)
    .catch((err) => handlError(err, 'خطا در حذف جلسه'));
}

export {
  fetchWeekSchedule,
  createKlassSession,
  updateKlassSession,
  deleteKlassSession,
};
