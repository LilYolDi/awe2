-- ==========================================
-- Y-FETISH
-- storage.sql
-- ==========================================

-- Создать Bucket для фотографий
insert into storage.buckets
(id, name, public)

values

(
'photos',
'photos',
true
)

on conflict (id) do nothing;

-- Разрешить всем просматривать фотографии

create policy "Public Read Photos"

on storage.objects

for select

using (

bucket_id='photos'

);

-- Разрешить загрузку фотографий

create policy "Public Upload Photos"

on storage.objects

for insert

with check (

bucket_id='photos'

);

-- Разрешить обновление

create policy "Public Update Photos"

on storage.objects

for update

using (

bucket_id='photos'

);

-- Разрешить удаление

create policy "Public Delete Photos"

on storage.objects

for delete

using (

bucket_id='photos'

);