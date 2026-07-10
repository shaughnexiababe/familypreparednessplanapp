package com.example.famprepplanapp;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.os.Bundle;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;
import com.example.famprepplanapp.worker.ExpirationWorker;
import com.getcapacitor.BridgeActivity;
import java.util.concurrent.TimeUnit;

public class MainActivity extends BridgeActivity {
    private static final String CHANNEL_ID = "expiration_channel";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createNotificationChannel();
        scheduleExpirationCheck();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "Expiration Notifications";
            String description = "Notifications for family plan updates";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            if (notificationManager != null) {
                notificationManager.createNotificationChannel(channel);
            }
        }
    }

    private void scheduleExpirationCheck() {
        PeriodicWorkRequest expirationWorkRequest =
                new PeriodicWorkRequest.Builder(ExpirationWorker.class, 24, TimeUnit.HOURS)
                        .addTag("ExpirationWorker")
                        .build();

        WorkManager.getInstance(this).enqueueUniquePeriodicWork(
                "ExpirationWorker",
                ExistingPeriodicWorkPolicy.KEEP,
                expirationWorkRequest
        );
    }
}
