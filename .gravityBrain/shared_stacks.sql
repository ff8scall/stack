-- Shared Stacks Table for Phase 3 Viral & Social
CREATE TABLE shared_stacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    stack_data TEXT NOT NULL, -- LZ-String compressed JSON
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast slug lookup
CREATE INDEX idx_shared_stacks_slug ON shared_stacks(slug);

-- RLS Policies (Enable Read/Write for everyone)
ALTER TABLE shared_stacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON shared_stacks
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON shared_stacks
    FOR INSERT WITH CHECK (true);
