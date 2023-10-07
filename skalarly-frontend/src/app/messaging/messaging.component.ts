import { Component } from '@angular/core';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent {
  // Use Switch map
  // HTTP Requests: When you make multiple HTTP requests based on some user interactions, you often want to ignore the responses from previous requests if new interactions occur. switchMap is used to cancel the ongoing HTTP request and switch to a new one when a new interaction happens.
  //   Autocomplete/Search: In autocomplete or search functionality, as a user types, you may want to cancel the ongoing search for previous input and only consider the results for the latest input.
  // User Authentication: When a user logs in or out, you might want to cancel any ongoing operations associated with their previous login state and initiate new operations based on their new login state.
  // Real-time Data: In applications that display real-time data (e.g., chat applications), you can use switchMap to switch to a new stream of data whenever the user changes the conversation.
  // this.userInput$.pipe(
  // switchMap(searchTerm => this.http.get(`/api/search?term=${searchTerm}`))
  // ).subscribe(result => {
  // Handle the result of the latest HTTP request
  // });
}
