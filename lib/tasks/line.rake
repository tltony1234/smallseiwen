namespace :line do
  task one: :environment do
    AlarmService.new.one
  end
end
