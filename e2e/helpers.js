// Using https://github.com/lyft/set-simulator-location for setting locaiton
const { spawn } = require('child_process');

const SCREENSHOT_OPTIONS = {
    timeout: 10000,
    killSignal: 'SIGKILL',
};

const setLocation = (lat, long) => {
    spawn('set-simulator-location', ['-c', `${lat}`, `${long}`]);
};

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const takeScreenshot = async (name) => {
    await device.takeScreenshot(name);
    // const screenshotFilename = `./e2e/screenshots/ios/${name}.png`;
    // execSync(`xcrun simctl io booted screenshot ${screenshotFilename}`, SCREENSHOT_OPTIONS);
};

const signIn = async (user) => {
    const { email, password } = user;
    await element(by.id('email')).typeText(email);
    await element(by.id('password')).typeText(password);
    await element(by.text('SIGN IN')).tap();
    await waitFor(element(by.text(`Welcome ${user.firstName}`))).toBeVisible().withTimeout(9000);
};

const signOut = async () => {
    await waitFor(element(by.id('menuanchor'))).toBeVisible().withTimeout(2000);
    await element(by.id('menuanchor')).tap();
    await waitFor(element(by.text('Sign Out'))).toBeVisible().withTimeout(2000);
    await element(by.text('Sign Out')).tap();
};

const describeIf = (condition) => condition ? describe : describe.skip;
const itIf = (condition) => condition ? it : it.skip;

module.exports = {
    setLocation,
    takeScreenshot,
    signIn,
    signOut,
    sleep,
    describeIf,
    itIf
};
