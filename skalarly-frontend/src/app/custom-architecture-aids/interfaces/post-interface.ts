export interface PostInterface {
  id: string;
  name: string;
  skalarlyName: string;
  // needs to be stored dynamically so changing picture doesn't need to update
  // every post ever made and any other connections
  //   profilePic:
}
