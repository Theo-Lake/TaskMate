# Software-Engineering-Project-2026
Software Engineering Project for Lancaster University made by: 
- Theo Scarton Lago : Group Leader + Fullstack
- Alex : Fullstack
- Aaron Skelhorn : Frontend
- Joephill Thomas : Frontend
- Toby Raisey : Frontend 

TaskMate

University Task Advertisement/Notice Board

This is a mobile app that can be downloaded on both Android and Apple devices.
It will be exclusive to university students/staff so that we can be sure of the identity of all users.
*  User will have to use their university email to sign-up
*  They may also enter their student ID as another form of identification
The idea of the application is that it is essentially a large digital noticeboard where users can publish tasks and advertisements.

Tasks will be small one-off jobs that another use could complete within a reasonable amount of time. Each task will have a name, description, price, estimated completion time, datetime, and location, as well as the publisher ID.
* Other user's will then be able to accept the task, in which they will them be prompted to enter a 1-to-1 chat with the publisher where they can communicate.
* To handle money, we will use a third-party service to complete transactions for security. This TPS will hold the money from the publisher when their task is published, and once both user's have confirmed the completion of the task, the assignee will receive their money. If the task is cancelled before being accepted, the money will be refunded to the publisher.

Advertisements will be free publications that consist of a description of what is being advertised, and must include the identification of the publisher. Depending on the type of the advert, it may optionally include a location and datetime
* Users can advertise a multitude of different things, including:
	* Events
	* Opportunities

For the safety of the users, there will also be an AI algorithm that will be used to censor explicit and dangerous content, such as:
* Any task with a title or description that constitutes academic cheating (content must comply with university academic regulations)
* Any tasks that may be deemed dangerous or unsafe
* Any tasks that constitute a job with hourly pay or recruitment
It will also ensure that tasks are clear and the description isn't deceptive