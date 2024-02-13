class Year{
	final int totalStudents;
	int students[];
	final int regularStudents;
	final int dsyStudents;
	final int tfwsStudents;
	Year(int totalStudents, int regularStudents,int tfwsStudents, int dsyStudents){
	this.totalStudents=totalStudents;
	this.regularStudents=regularStudents;
	this.tfwsStudents=tfwsStudents;
	this.dsyStudents=dsyStudents;
	generateStudents();
	}
	
	private void generateStudents(){
		students=new int[totalStudents];
		int i=0, j=151, k=501;
		for(;i<totalStudents;i++){
			if(i<regularStudents){
				students[i]=i;
			}else if(j<=150+ tfwsStudents){
				students[i]=j;
				j++;
			} else if(k<= 500 + dsyStudents){
				students[i]=k;
				k++;
			
			}
		}
	
	}
	
	int selectRegistrationNumber(){
		int index =(int) (System.nanoTime() % totalStudents);
		return students[index];
	
	}
         
         public static void main(String args[]){
         
         Year inftSY = new Year(78,64,3,11);
         System.out.println(inftSY.selectRegistrationNumber());
         
         }

}
