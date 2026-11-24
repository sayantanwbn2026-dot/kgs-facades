-- Carry the enquirer's own email and phone into the notification (and set it
-- as the reply-to address) so whoever reads support@kolkataglazing.com can
-- hit "Reply" and land straight in a conversation with the customer, instead
-- of having to copy the address out of the table body first.
create or replace function public.notify_enquiry_email()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  begin
    perform net.http_post(
      url := 'https://formsubmit.co/ajax/support@kolkataglazing.com',
      body := jsonb_build_object(
        '_subject',
          'New enquiry — ' || coalesce(nullif(new.name, ''), 'KGS website')
          || case when coalesce(new.project, '') <> '' then ' · ' || new.project else '' end,
        '_template', 'table',
        '_captcha', 'false',
        '_replyto', nullif(new.email, ''),
        'Name', new.name,
        'Email', new.email,
        'Phone', new.phone,
        'Organization', new.org,
        'Project type', new.project,
        'Location', new.location,
        'Budget', new.budget,
        'Project brief', new.message
      )
    );
  exception when others then
    null; -- never let an email problem break the enquiry
  end;
  return new;
end;
$$;
