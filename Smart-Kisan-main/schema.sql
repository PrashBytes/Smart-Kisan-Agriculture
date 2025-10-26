-- =====================================================
-- Smart Kisan Database Schema
-- =====================================================
-- This file contains all SQL commands needed to set up
-- the database for the Smart Agriculture project.
-- Run these commands in MySQL Workbench in the order shown.

-- =====================================================
-- 1. CREATE DATABASE
-- =====================================================
CREATE DATABASE IF NOT EXISTS smartkisan_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE smartkisan_db;

-- =====================================================
-- 2. CREATE USER (Optional - if you want to create a dedicated user)
-- =====================================================
-- Uncomment the following lines if you want to create a dedicated user
-- CREATE USER IF NOT EXISTS 'smartkisan_user'@'localhost' IDENTIFIED BY 'AgriPass123';
-- GRANT ALL PRIVILEGES ON smartkisan_db.* TO 'smartkisan_user'@'localhost';
-- FLUSH PRIVILEGES;

-- =====================================================
-- 3. CREATE TABLES
-- =====================================================

-- Table: data_point
-- Stores sensor readings (moisture, temperature, humidity) with timestamps
-- and the currently selected crop type
CREATE TABLE IF NOT EXISTS data_point (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    moisture DECIMAL(5,2) NOT NULL COMMENT 'Soil moisture percentage (0-100)',
    temperature DECIMAL(5,2) NOT NULL COMMENT 'Temperature in Celsius',
    humidity DECIMAL(5,2) NOT NULL COMMENT 'Air humidity percentage (0-100)',
    crop_type VARCHAR(50) NOT NULL COMMENT 'Currently selected crop type',
    timestamp DATETIME NOT NULL COMMENT 'When the data was recorded',
    INDEX idx_timestamp (timestamp),
    INDEX idx_crop_type (crop_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: crop_selection
-- Stores the single, currently selected crop type
-- This table will only ever contain one row (ID=1)
CREATE TABLE IF NOT EXISTS crop_selection (
    id BIGINT PRIMARY KEY DEFAULT 1,
    crop_type VARCHAR(50) NOT NULL COMMENT 'Currently selected crop type',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_single_row CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 4. INSERT INITIAL DATA
-- =====================================================

-- Insert default crop selection (Wheat)
INSERT INTO crop_selection (id, crop_type) 
VALUES (1, 'wheat')
ON DUPLICATE KEY UPDATE 
    crop_type = VALUES(crop_type),
    updated_at = CURRENT_TIMESTAMP;


-- =====================================================
-- 5. CREATE USEFUL VIEWS
-- =====================================================

-- View: latest_sensor_data
-- Provides easy access to the most recent sensor reading
CREATE OR REPLACE VIEW latest_sensor_data AS
SELECT 
    id,
    moisture,
    temperature,
    humidity,
    crop_type,
    timestamp
FROM data_point
ORDER BY timestamp DESC
LIMIT 1;

-- View: sensor_data_summary
-- Provides summary statistics for the last 24 hours
CREATE OR REPLACE VIEW sensor_data_summary AS
SELECT 
    crop_type,
    COUNT(*) as reading_count,
    ROUND(AVG(moisture), 2) as avg_moisture,
    ROUND(MIN(moisture), 2) as min_moisture,
    ROUND(MAX(moisture), 2) as max_moisture,
    ROUND(AVG(temperature), 2) as avg_temperature,
    ROUND(MIN(temperature), 2) as min_temperature,
    ROUND(MAX(temperature), 2) as max_temperature,
    ROUND(AVG(humidity), 2) as avg_humidity,
    ROUND(MIN(humidity), 2) as min_humidity,
    ROUND(MAX(humidity), 2) as max_humidity,
    MIN(timestamp) as first_reading,
    MAX(timestamp) as last_reading
FROM data_point
WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
GROUP BY crop_type;

-- =====================================================
-- 6. CREATE STORED PROCEDURES
-- =====================================================

-- Procedure: Get latest data for a specific crop
DELIMITER //
CREATE PROCEDURE GetLatestDataForCrop(IN crop_name VARCHAR(50))
BEGIN
    SELECT 
        id,
        moisture,
        temperature,
        humidity,
        crop_type,
        timestamp
    FROM data_point
    WHERE crop_type = crop_name
    ORDER BY timestamp DESC
    LIMIT 1;
END //
DELIMITER ;

-- Procedure: Get sensor data for date range
DELIMITER //
CREATE PROCEDURE GetSensorDataRange(
    IN start_date DATETIME,
    IN end_date DATETIME,
    IN crop_name VARCHAR(50)
)
BEGIN
    SELECT 
        id,
        moisture,
        temperature,
        humidity,
        crop_type,
        timestamp
    FROM data_point
    WHERE timestamp BETWEEN start_date AND end_date
    AND (crop_name IS NULL OR crop_type = crop_name)
    ORDER BY timestamp DESC;
END //
DELIMITER ;

-- =====================================================
-- 7. CREATE TRIGGERS
-- =====================================================

-- Trigger: Update crop_selection timestamp when crop changes
DELIMITER //
CREATE TRIGGER update_crop_selection_timestamp
BEFORE UPDATE ON crop_selection
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;

-- =====================================================
-- 8. VERIFICATION QUERIES
-- =====================================================

-- Verify database and tables were created
SELECT 'Database created successfully' as status;
SHOW TABLES;

-- Verify initial data
SELECT 'Initial crop selection:' as info;
SELECT * FROM crop_selection;

SELECT 'Sensor data table is empty (no sample data inserted)' as info;

-- Test the views
SELECT 'Latest sensor data view:' as info;
SELECT * FROM latest_sensor_data;

SELECT 'Sensor data summary (last 24h):' as info;
SELECT * FROM sensor_data_summary;

-- =====================================================
-- 9. USEFUL QUERIES FOR MONITORING
-- =====================================================

-- Query 1: Get all data for a specific crop
-- SELECT * FROM data_point WHERE crop_type = 'wheat' ORDER BY timestamp DESC;

-- Query 2: Get average readings for the last hour
-- SELECT 
--     ROUND(AVG(moisture), 2) as avg_moisture,
--     ROUND(AVG(temperature), 2) as avg_temperature,
--     ROUND(AVG(humidity), 2) as avg_humidity
-- FROM data_point 
-- WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 1 HOUR);

-- Query 3: Get data count by crop type
-- SELECT crop_type, COUNT(*) as reading_count 
-- FROM data_point 
-- GROUP BY crop_type;

-- Query 4: Get data for the last 7 days
-- SELECT * FROM data_point 
-- WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
-- ORDER BY timestamp DESC;

-- =====================================================
-- 10. CLEANUP QUERIES (Use with caution!)
-- =====================================================

-- Clear all sensor data (use with caution!)
-- DELETE FROM data_point;

-- Reset crop selection to default
-- UPDATE crop_selection SET crop_type = 'wheat' WHERE id = 1;

-- Drop database (use with extreme caution!)
-- DROP DATABASE IF EXISTS smartkisan_db;

-- =====================================================
-- END OF SCHEMA FILE
-- =====================================================
