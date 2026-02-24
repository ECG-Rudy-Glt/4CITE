import {BookingRepository} from "@/api/BookingRepository.ts";
import {BookingRequest} from "@/components/BookingRequest.ts";
import {BookingResponse} from "@/components/BookingResponse.ts";

export class RestApiBookingRepository implements BookingRepository {
    checkAvailability(roomId: string, startDate: string, endDate: string): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const unavailable = Math.random() < 0.2
                resolve(!unavailable)
            }, 800)
        });
    }

    createBooking(data: BookingRequest): Promise<BookingResponse> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const failure = Math.random() < 0.1
                if (failure) {
                    reject(new Error("Erreur serveur"))
                } else {
                    resolve({ status: "ok" })
                }
            }, 800)
        });
    }

}