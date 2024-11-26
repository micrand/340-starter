--#1 - Tony Stark Insert
INSERT INTO public.account(
	account_firstname, account_lastname, account_email, account_password)
	VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

--#2 - Tony Stark Update
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;

--#3 - Tony Stark Delete
DELETE FROM public.account WHERE account_id = 1;

--#4 - Inventory Description Update
UPDATE public.inventory SET inv_description = REPLACE(inv_description, 'small interior', 'a huge interior') WHERE inv_id = 10;

--#5 - Select with Join to filter Sport vehicle
SELECT i.inv_make, i.inv_model FROM public.inventory as i
INNER JOIN public.classification c ON c.classification_id = i.classification_id
WHERE c.classification_name = 'Sport';

--#6 -  Image Update to add "/vehicles" in the image path
UPDATE public.inventory SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'), inv_thumbnail = REPLACE(inv_thumbnail,'/images','/images/vehicles');