-- Pin search_path to prevent object-shadowing attacks
alter function public.creative_storage_path(uuid, uuid, text) set search_path = public;
