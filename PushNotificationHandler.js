import {Component} from 'react';
import {Alert} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class PushNotificationHandler extends Component {
  componentDidMount() {
    console.log('component did mount');
    PushNotificationIOS.addEventListener('register', token => {
      console.log('token: ', token);
      Alert.alert(token);
    });

    PushNotificationIOS.addEventListener(
      'registrationError',
      registrationError => {
        console.log(registrationError, '--');
      },
    );
//below function trigger when notification received when application in foreground mode
    PushNotificationIOS.addNotificationRequest({
      fireDate: new Date(Date.now() + 5 * 1000).toISOString(),
      title: 'pure react native test',
      subtitle: 'Wake up',
      body: 'Some more description',
      sound: 'Alarm.wav',
      category: 'userAction',
      userInfo: {
        name: 'Test',
        userId: '48932nmfe98ryhe9-oi32yrhfo',
      },
      id: new Date().toString(),
      threadId: '490uio3rji',
      repeats: 'day',
    });
//below function will trigger when app killed from background and tap notification and open application
    PushNotificationIOS.addEventListener('notification', function(
      notification,
    ) {
      console.log('Log - notification is open', notification);
      if (!notification) {
        return;
      }
      const data = notification.getData();
      Alert.alert(JSON.stringify({data, source: 'CollapsedApp'}));
    });

    PushNotificationIOS.getInitialNotification().then(notification => {
      console.log('Log - notification from closed', notification);
      if (!notification) {
        return;
      }
      const data = notification.getData();
      Alert.alert(JSON.stringify({data, source: 'ClosedApp'}));
    });
    PushNotificationIOS.requestPermissions();
  }

  render() {
    return null;
  }
}

export default PushNotificationHandler;
