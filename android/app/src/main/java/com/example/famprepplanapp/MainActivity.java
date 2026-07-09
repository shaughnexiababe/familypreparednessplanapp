package com.example.famprepplanapp;

import android.os.Bundle;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;
import com.example.famprepplanapp.worker.ExpirationWorker;
import com.getcapacitor.BridgeActivity;
import java.util.concurrent.TimeUnit;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        scheduleExpirationCheck();
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
