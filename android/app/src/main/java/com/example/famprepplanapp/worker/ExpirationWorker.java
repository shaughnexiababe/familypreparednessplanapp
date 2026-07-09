package com.example.famprepplanapp.worker;

import android.content.Context;
import android.util.Log;
import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.work.Worker;
import androidx.work.WorkerParameters;
import com.example.famprepplanapp.R;

public class ExpirationWorker extends Worker {
    private static final String TAG = "ExpirationWorker";
    private static final String CHANNEL_ID = "expiration_channel";

    public ExpirationWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
    }

    @NonNull
    @Override
    public Result doWork() {
        Log.d(TAG, "Expiration check running...");
        
        // In a real app, check if the plan is > 6 months old
        // For this task, we assume the worker was triggered to notify the user
        
        sendExpirationNotification();
        
        return Result.success();
    }

    private void sendExpirationNotification() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(getApplicationContext(), CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle("Plano sa Kahandaan - Update")
                .setContentText("Kailangan nang i-update ang inyong Family Preparedness Plan. 6 na buwan na ang nakalipas.")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setAutoCancel(true);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(getApplicationContext());
        try {
            // In a real app, check for POST_NOTIFICATIONS permission on Android 13+
            notificationManager.notify(1, builder.build());
        } catch (SecurityException e) {
            Log.e(TAG, "Missing notification permission", e);
        }
    }
}
