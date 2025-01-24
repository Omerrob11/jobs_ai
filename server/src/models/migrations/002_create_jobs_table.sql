
-- enum - data type that can only contain a predefined set of values
-- type: are like variables types in programming, we can have enum, text, etc.
-- this is the data we will fetch each time the user sign in to the page
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),           
    company_name TEXT NOT NULL,
    position TEXT NOT NULL,
    -- status: tell us which column each job belongs to
    status TEXT NOT NULL DEFAULT 'wishlist', 
    application_date DATE,        
    notes TEXT,             
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);