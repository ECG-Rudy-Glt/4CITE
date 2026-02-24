import {BookingRepository} from "@/api/BookingRepository.ts";
import {BookingRequest} from "@/components/BookingRequest.ts";
import {BookingResponse} from "@/components/BookingResponse.ts";

export class RestApiBookingRepository implements BookingRepository {
    async checkAvailability(roomId: string, startDate: string, endDate: string): Promise<boolean> {
        const response = await fetch(`/booking/room/${roomId}/availability?startDate=${startDate}&endDate=${endDate}`);
        const data = await response.json();
        return data.available;
    }

    async createBooking(data: BookingRequest): Promise<BookingResponse> {
        const response = await fetch('/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Erreur serveur");
        }
        return await response.json();
    }

}