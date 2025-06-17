# Poke-Battle

# Install & Run
    composer install
    npm install
    php artisan storage:link
    composer run dev

## Pint
    ./vendor/bin/pint
    
## Generate all
    php artisan make:model Post -mcrf

## Stripe
    stripe listen --forward-to http://localhost:8000/stripe/webhook
