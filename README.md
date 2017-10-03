# PR-View

PR-View (/preview/) is a Git activity visualizer.

Where you can use the activity feeds in sites like GitLab or GitHub to see what is going on in a repo or organization I found that when it came to performing code reviews and following up on said reviews that a fleeting feed resulted in delays or missed responses.

For example say you reviewed a PR and posted a bunch or comments. The author of the PR may not notice that you submitted a review if they are busy with other work. Sure they get an email but if they are like me I get a billion emails and they are all filtered and mostly ignored (My team mostly communicates over Slack so emails are just corporate stuff which can wait). I have to leave the PR open in different tabs and continually return to them to see if a review or a response to my review has been submitted.

I tried RSS readers which gave toast notices but those were again fleeting (disappeared before I could look at them) and low on details; with a finite amount of space on a toast less is more. The feeds I was getting chose to not show the PR title but instead showed the PR number but those I don't memorize so again it was only so effective. It did however offer a _read_ visualization to let me know which activities I've already read and which are new.

PR-View is an attempt to build a _radiator_ for all open PRs showing which PRs have comments and which were updated since last you read them. It will allow you to mark PRs as done to remove them from the radiator. The goal is to provide a single page view of what PRs are pending your attention.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Contributing

Bug reports and pull requests are welcome. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](https://contributor-covenant.org/) code of conduct.

## License

The tool is available as open source under the terms of the [ISC License](https://choosealicense.com/licenses/isc/).